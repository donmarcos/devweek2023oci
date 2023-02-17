resource "tls_private_key" "ssh" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_file" "ssh_private_key" {
  content         = tls_private_key.ssh.private_key_pem
  filename        = "id_rsa"
  file_permission = "0600"
}

resource "local_file" "ssh_public_key" {
  content         = tls_private_key.ssh.public_key_openssh
  filename        = "id_rsa.pub"
  file_permission = "0600"
}

locals {
  compartment_id = oci_identity_compartment._.id
  authorized_keys = [chomp(tls_private_key.ssh.public_key_openssh)]
}

output "sshprivate_key" {
  value     = tls_private_key.ssh.private_key_pem
  sensitive = true
}

output "sshpublic_key" {
  value     = tls_private_key.ssh.public_key_openssh
  sensitive = true
}