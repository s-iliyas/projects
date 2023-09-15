# from cryptography.hazmat.primitives.asymmetric import rsa, padding
# from cryptography.hazmat.primitives import serialization, hashes

# # Generate an RSA key pair
# private_key = rsa.generate_private_key(
#     public_exponent=65537,
#     key_size=2048
# )
# public_key = private_key.public_key()

# # Serialize the private key and save it to a file
# with open("private_key.pem", "wb") as f:
#     f.write(private_key.private_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PrivateFormat.PKCS8,
#         encryption_algorithm=serialization.NoEncryption()
#     ))

# # Serialize the public key and save it to a file
# with open("public_key.pem", "wb") as f:
#     f.write(public_key.public_bytes(
#         encoding=serialization.Encoding.PEM,
#         format=serialization.PublicFormat.SubjectPublicKeyInfo
#     ))

from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization
private_key = Ed25519PrivateKey.generate()
signature = private_key.sign(b"my authenticated message")
public_key = private_key.public_key()
with open("private_key.pem", "wb") as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ))
with open("public_key.pem", "wb") as f:
    f.write(public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    ))
# Raises InvalidSignature if verification fails
# public_key.verify(signature, b"my authenticated message")
import ed25519

# Generate a private/public key pair for user1
user1_private_key = ed25519.create_keypair()
user1_private_key_bytes = user1_private_key.to_seed()
user1_public_key_bytes = user1_private_key.get_verifying_key().to_bytes()

# Write the private key to a file
with open("user1_private.key", "wb") as f:
    f.write(user1_private_key_bytes)

# Write the public key to a file
with open("user1_public.key", "wb") as f:
    f.write(user1_public_key_bytes)

# Generate a private/public key pair for user2
user2_private_key = ed25519.create_keypair()
user2_private_key_bytes = user2_private_key.to_seed()
user2_public_key_bytes = user2_private_key.get_verifying_key().to_bytes()

# Write the private key to a file
with open("user2_private.key", "wb") as f:
    f.write(user2_private_key_bytes)

# Write the public key to a file
with open("user2_public.key", "wb") as f:
    f.write(user2_public_key_bytes)