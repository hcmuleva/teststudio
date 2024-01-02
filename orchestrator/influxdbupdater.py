def influxdbupdate(influxdbdata, root):
    if influxdbdata is not None and influxdbdata['influxdbtoken'] is not None and influxdbdata['influxdbbucket'] is not None and influxdbdata['influxdborg'] is not None:
        influxdb_url_element = root.find(".//elementProp[@name='influxdbUrl']/stringProp[@name='Argument.value']")
        if influxdb_url_element is not None:
            influxdburl = influxdbdata['influxdburl']
            influxdbbucket = influxdbdata['influxdbbucket']
            influxdborg = influxdbdata['influxdborg']
            
            raw_url = f'{influxdburl}/api/v2/write?org={influxdborg}&bucket={influxdbbucket}'
            influxdb_url_element.text = raw_url

        influxdb_token_element = root.find(".//elementProp[@name='influxdbToken']/stringProp[@name='Argument.value']")
        if influxdb_token_element is not None:
            influxdbtoken = influxdbdata['influxdbtoken']
            influxdb_token_element.text = influxdbtoken
        else:
            print("Influx db setting Not found")
        print("Updated Influx DB")
    else:
        print("influxdbip or influxtoken is either not specified or it is null")