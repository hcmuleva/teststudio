def jmeterupdate(jmeterobj,root,http_sampler):
    print("JMETER OBJECT ", jmeterobj)
    thread_group = root.find(".//ThreadGroup")
    if 'threadcount' in jmeterobj and jmeterobj['threadcount']:
        num_threads = thread_group.find(".//stringProp[@name='ThreadGroup.num_threads']")
        num_threads.text = str(jmeterobj['threadcount'])
    print("After totalthreads")
    # Set the ramp-up time
    if 'rampup' in jmeterobj and jmeterobj['rampup']:
        ramp_up = thread_group.find(".//stringProp[@name='ThreadGroup.ramp_time']")
        ramp_up.text = str(jmeterobj['rampup'])
    print("rampup")
    # Set the loop count
    if 'loop_count' in jmeterobj and jmeterobj['loop_count']:
        loop_count = thread_group.find(".//stringProp[@name='LoopController.loops']")
        loop_count.text = str(jmeterobj['loop_count'])
    print("After Loop")
    # AUT HOST IP/Domain Replacement
    if 'aut' in jmeterobj and jmeterobj['aut']:
        hosturl=jmeterobj["aut"]
        tokens = hosturl.split("://")
        protocol=http_sampler.find(".stringProp[@name='HTTPSampler.protocol']")
        protocol.text=str(tokens[0])
        hostname=http_sampler.find(".stringProp[@name='HTTPSampler.domain']")
        hostname.text=str(tokens[1]) 
    print("After aut")
    # AUT HOST PORT Replacement
    if 'port' in jmeterobj and jmeterobj['port']:
        hostname=http_sampler.find(".stringProp[@name='HTTPSampler.port']")
        hostname.text=jmeterobj["port"]
    print("After port")
    # THIS IS FOR FILEDOWnLOAD FILE PATH set 
    if 'filepath' in jmeterobj and jmeterobj['filepath']:
        filepath=http_sampler.find(".stringProp[@name='HTTPSampler.path']")
        filepath.text=jmeterobj["filepath"]
    print("After filepath")
 

    