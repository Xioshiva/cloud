import sys
import openstack

openstack.enable_logging(debug=True, stream=sys.stdout)

conn = openstack.connect(cloud='openstack')

db = conn.create_server(name='db', 
                        image='a5f12d10-9ef7-43b7-bf59-b577f1302029', 
                        auto_ip=False,
                        flavor='m1.small', 
                        wait=True, 
                        security_groups='database', 
                        key_name='gus',
                        userdata="""#!/bin/bash \n cd ~/db/ && node server.js""")

back = conn.create_server(name='back', 
                          image='b9eeb84c-56ec-4388-b0a2-abd85c5ef613', 
                          flavor='m1.small', 
                          wait=True, 
                          security_groups='backend', 
                          key_name='gus',
                          userdata="""#!/bin/bash \n cd ~/backend/ && sed -i '25s/.*/var dbLink = \"http:\/\/"""+ db.ipv4_address+""":8081\";/' server.js && node server.js""")

front = conn.create_server(name='front', 
                          image='1504a752-ad5b-4af0-a03a-f0cc68e92f82', 
                          flavor='m1.small', 
                          wait=True, 
                          security_groups='frontend', 
                          key_name='gus',
                          userdata= """#!/bin/bash \n cd ~/frontend && sed -i '2s/.*/let address = \""""+back.ipv4_address+"""\";/'  classements/classements.js && python3 -m http.server""")