from mlask import MLAsk
import json
import sys

args = sys.argv
value = args[1]
emotion_analyzer = MLAsk()
result = emotion_analyzer.analyze(value)
print(json.dumps(result))
