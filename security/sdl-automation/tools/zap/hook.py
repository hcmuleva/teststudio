import sys

def zap_started(zap, target):
    #enable the script to add auth token to every zap request
    zap.script.load('auth_token_add.js', 'httpsender', 'Oracle Nashorn', '/zap/wrk/auth_token_add.js', 'Auth token add script')
    zap.script.enable('auth_token_add.js')

    #enable input validation test script
    zap.script.load('input_validation_test.js', 'active', 'Oracle Nashorn', '/zap/wrk/input_validation_test.js', 'Input validation test script')
    zap.script.enable('input_validation_test.js')

def zap_pre_shutdown(zap):
    sdl_control = None
    for arg_ind in range(len(sys.argv)):
        if sys.argv[arg_ind] == "-z":
            secondary_arg_list = sys.argv[arg_ind+1].split(" ")
            for seconday_arg_ind in range(len(secondary_arg_list)):
                if secondary_arg_list[seconday_arg_ind] == "-sdlcontrol":
                    sdl_control = secondary_arg_list[seconday_arg_ind+1]

    report_title = "SDL Control " + sdl_control
    zap.reports.generate(report_title, "modern", theme="corporate", reportdir="/zap/wrk", reportfilename="zap-report-pretty.html")
    zap.reports.generate(report_title, "traditional-json-plus", reportdir="/zap/wrk", reportfilename="zap-report-raw.json")