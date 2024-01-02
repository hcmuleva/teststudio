from flask import Flask, request, jsonify
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding

from cryptography.hazmat.primitives import hashes
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives.serialization import Encoding
from cryptography.hazmat.primitives.serialization import PrivateFormat
from cryptography.hazmat.primitives.serialization import PublicFormat
from cryptography.hazmat.primitives.serialization import NoEncryption
import requests
import json
import base64
import datetime
app = Flask(__name__)

@app.route('/generate_keys_and_send_challenge', methods=['POST'])
def generate_keys_and_send_challenge():
    # Generate private key
    str_obj=request.json
    print("str_obj ", str_obj)
    challengeStr=str_obj['challengestr']

    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    # Serialize private key to PEM format
    private_pem = private_key.private_bytes(
        encoding=Encoding.PEM,
        format=PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=NoEncryption()
    )

    # Generate public key from private key
    public_key = private_key.public_key()

    # Serialize public key to PEM format
    public_pem = public_key.public_bytes(
        encoding=Encoding.PEM,
        format=PublicFormat.SubjectPublicKeyInfo
    )

    # Generate a self-signed certificate
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, u'US'),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u'CA'),
        x509.NameAttribute(NameOID.LOCALITY_NAME, u'San Francisco'),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u'MyOrg'),
        x509.NameAttribute(NameOID.COMMON_NAME, u'MyCert'),
    ])

    cert = x509.CertificateBuilder().subject_name(
        subject
    ).issuer_name(
        issuer
    ).public_key(
        public_key
    ).serial_number(
        x509.random_serial_number()
    ).not_valid_before(
        datetime.datetime.utcnow()
    ).not_valid_after(
        datetime.datetime.utcnow() + datetime.timedelta(days=365)
    ).sign(
        private_key,
        hashes.SHA256()
    )

    # Serialize certificate to PEM format
    cert_pem = cert.public_bytes(Encoding.PEM)

    # Send the public key, certificate, and challenge to Service 2
    
    data = {'public_key': public_pem.decode('utf-8'), 'certificate': cert_pem.decode('utf-8'), 'challengeStr': challengeStr}
    print("data ", data)
    response = requests.post('http://localhost:7080/challenge', json=data)

    try:
        response_data = response.json()  # Attempt to parse response as JSON
        encrypted_challenge = response_data.get('encrypted_challenge', '')
    except json.JSONDecodeError:
        encrypted_challenge = ''
    print("Encrypted challenge ", encrypted_challenge)
    # Decrypt the challenge using the private key
    decrypted_challenge = private_key.decrypt(
        base64.b64decode(encrypted_challenge),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    # Call now again device service to register by passing service tag and other payload.
    
    return jsonify({'decrypted_challenge': decrypted_challenge.decode('utf-8')})
if __name__ == '__main__':
    app.run(debug=True, port=9080)
