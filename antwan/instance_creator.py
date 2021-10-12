import exoscale
from exoscale.api.compute import SSHKey
exo = exoscale.Exoscale()


zone_fra1 = exo.compute.get_zone("de-fra-1")

# Image/template for the modules
db_template = exo.compute.get_instance_template(
    zone_fra1, "276c50ee-b721-4908-a83b-76b6b41ebbd7")

front_template = exo.compute.get_instance_template(
    zone_fra1, "550e66a6-8d18-428b-8512-30d9842419ea")

back_template = exo.compute.get_instance_template(
    zone_fra1, "84af1639-7549-4833-8624-9b81548047cc")


# Create db instance
db = exo.compute.create_instance(name="db",
                                 zone=zone_fra1,
                                 type=exo.compute.get_instance_type("tiny"),
                                 template=db_template,
                                 security_groups=[exo.compute.get_security_group(
                                     id="a11894a1-6818-4ad7-ac08-8b33ded3d120")],
                                 user_data="""
                            #cloud-config
                            runcmd:
                               - cd /home/debian/db/ 
                               - node server.js
                            """)

# Create backend instance
back = exo.compute.create_instance(name="backend",
                                    zone=zone_fra1,
                                   type=exo.compute.get_instance_type("tiny"),
                                   template=back_template,
                                   security_groups=[exo.compute.get_security_group(
                                       id="a11894a1-6818-4ad7-ac08-8b33ded3d120")],
                                   user_data="""
                                    #cloud-config
                                    runcmd:
                                    - cd /home/debian/backend/ 
                                    - sed -i '25s/.*/var dbLink = \"http:\/\/"""+ db.ipv4_address+""":8081\";/' server.js
                                    - node server.js
                                """)

print(db.ipv4_address)

front = exo.compute.create_instance(name="front",
                                    zone=zone_fra1,
                                    type=exo.compute.get_instance_type("tiny"),
                                    template=front_template,
                                    security_groups=[exo.compute.get_security_group(
                                        id="b383e6f1-2798-4baf-86b5-f6bf416d3150")],
                                    ssh_key=exo.compute.get_ssh_key("antwan"),
                                    user_data="""
                            #cloud-config
                            runcmd:
                                - cd /home/debian/frontend
                                - sed -i '2s/.*/let address = \""""+back.ipv4_address+"""\";/'  classements/classements.js
                                - python3 -m http.server
                            """)