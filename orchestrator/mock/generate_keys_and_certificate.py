from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives.serialization import Encoding
from cryptography.hazmat.primitives.serialization import PrivateFormat
from cryptography.hazmat.primitives.serialization import PublicFormat
from cryptography.hazmat.primitives.serialization import NoEncryption
import datetime  # Import the datetime module

# Generate private key
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

# Save the keys and certificate to files
with open('private_key.pem', 'wb') as f:
    f.write(private_pem)

with open('public_key.pem', 'wb') as f:
    f.write(public_pem)

with open('self_signed_cert.pem', 'wb') as f:
    f.write(cert_pem)
