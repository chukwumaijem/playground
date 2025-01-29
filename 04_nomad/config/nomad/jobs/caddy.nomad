job "caddy" {
  datacenters = ["dc1"]

  group "caddy" {
    count = 1

    network {
      mode = "host"

      port "http" {
        static = 80
      }
    }

    service {
      name     = "caddy-server"
      provider = "nomad"
      port = "http"
    }

    volume "caddy_file" {
      type      = "host"
      read_only = false
      source    = "caddy_file"
    }
    volume "caddy_data" {
      type      = "host"
      read_only = false
      source    = "caddy_data"
    }
    volume "caddy_config" {
      type      = "host"
      read_only = false
      source    = "caddy_config"
    }

    task "server" {
      driver = "docker"
      config {
        image        = "caddy:2.8"
        network_mode = "host"
      }

      volume_mount {
        volume      = "caddy_file"
        destination = "/etc/caddy/Caddyfile"
      }
      volume_mount {
        volume      = "caddy_data"
        destination = "/data"
      }
      volume_mount {
        volume      = "caddy_config"
        destination = "/config"
      }
    }
  }
}
