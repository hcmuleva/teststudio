from flask import Flask, request, jsonify
from cryptography.hazmat.primitives.asymmetric import padding

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
import base64
import datetime

app = Flask(__name__)

@app.route('/challenge', methods=['POST'])
def receive_challenge():
    data = request.get_json()
    print("DATA ", data)
    if data is None:
        return jsonify({'error': 'Invalid JSON in request'}), 400

    # Extract the public key, certificate, and challenge
    public_key_pem = data.get('public_key', '')
    certificate_pem = data.get('certificate', '')
    print("data",data['challengeStr'])
    challenge = data['challengeStr']
    print("CHALLENGE ", challenge)
    if not public_key_pem or not certificate_pem or not challenge:
        return jsonify({'error': 'Invalid request data'}), 400    # Convert the public key from PEM to an object
    public_key = serialization.load_pem_public_key(public_key_pem.encode('utf-8'))
    print("public_key ", public_key)
    # Encrypt the challenge using the public key
    encrypted_challenge = public_key.encrypt(
        challenge.encode('utf-8'),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )

    # Encode the encrypted challenge as base64 before sending
    encrypted_challenge_base64 = base64.b64encode(encrypted_challenge).decode('utf-8')
    print("encrypted_challenge_base64 ", encrypted_challenge_base64)
    return jsonify({'encrypted_challenge': encrypted_challenge_base64})

if __name__ == '__main__':
    app.run(debug=True, port=7080)
