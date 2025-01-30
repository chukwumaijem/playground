job "colors" {
  datacenters = ["dc1"]

  group "colors-app" {
    count = 1

    service {
      name     = "colors-app"
      provider = "nomad"
    }

    task "server" {
      driver = "docker"

      config {
        image        = "colors:v1"
        network_mode = "host"
      }
    }
  }
}
