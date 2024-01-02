from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes

# Load private key for decryption
with open('private_key.pem', 'rb') as f:
    private_key = serialization.load_pem_private_key(
        f.read(),
        password=None
    )

# Load public key for encryption
with open('public_key.pem', 'rb') as f:
    public_key = serialization.load_pem_public_key(f.read())

# String to encrypt
plaintext = b"Hello, World!"

# Encrypt using the public key
ciphertext = public_key.encrypt(
    plaintext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# Decrypt using the private key
decrypted_plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

print("Original plaintext:", plaintext)
print("Decrypted plaintext:", decrypted_plaintext.decode('utf-8'))
