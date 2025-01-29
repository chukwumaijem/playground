data_dir = "/opt/nomad/data"
bind_addr = "0.0.0.0"

server {
  enabled = true
  bootstrap_expect = 1
}

acl {
  enabled = true
}

client {
  enabled = true
  servers = ["127.0.0.1"]

  host_volume "caddy_file" {
    path      = "/home/vagrant/config/caddy/Caddyfile"
    read_only = false
  }
  host_volume "caddy_data" {
    path      = "/home/vagrant/config/caddy/data"
    read_only = false
  }
  host_volume "caddy_config" {
    path      = "/home/vagrant/config/caddy/config"
    read_only = false
  }
}
