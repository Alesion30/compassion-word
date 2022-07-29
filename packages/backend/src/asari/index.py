from asari.api import Sonar
import json
import sys

args = sys.argv
value = args[1]
sonar = Sonar()
result = sonar.ping(text=value)
print(json.dumps(result))
