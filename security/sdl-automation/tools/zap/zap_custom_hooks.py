

def zap_started(zap, target):
  zap.script.load('input_validation_test.js', 'active', 'Oracle Nashorn', '/zap/wrk/input_validation_test.js', 'Input validation test script')
  zap.script.enable('input_validation_test.js')
