
resource "null_resource" "docker_config" {
  for_each = oci_core_instance._

  provisioner "file" {
    source      = "./resources/install_docker.sh"
    destination = "/home/docker/temp/install_docker.sh"

    connection {
      type = "ssh"
      user = "docker"
      host = each.value.public_ip
	  private_key = "${file("./id_rsa")}"
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo bash /home/docker/temp/install_docker.sh",
    ]

    connection {
      type = "ssh"
      user = "docker"
      host = each.value.public_ip
	  private_key = "${file("./id_rsa")}"
    }
  }
}
