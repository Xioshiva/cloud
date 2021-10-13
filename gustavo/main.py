import sys
import openstack

def main():
    openstack.enable_logging(debug=True, stream=sys.stdout)

    conn = openstack.connect(cloud='openstack')

    front = create_server(conn, "frontend", "m1.small", "private", "gus", "frontend")

    back = create_server(conn, "backend", "m1.small", "private", "gus", "backend")

    db = create_server(conn, "database", "m1.small", "private", "gus", "database")


def create_server(conn, image_name, flavor_name, network_name, keypair_name, server_name):
    print("Create Server: ")
    
    image = conn.compute.find_image(image_name)
    flavor = conn.compute.find_flavor(flavor_name)
    network = conn.compute.find_network(network_name)
    keypair = conn.compute.find_keypair(keypair_name)

    server = conn.compute.create_server(
        name=server_name, image_id=image.id, flavor_id=flavor.id, 
        networks=[{"uuid": network.id}], key_name=keypair.name)
    
    server = conn.compute.wait_for_server(server)

if __name__ == "__main__":
    main()