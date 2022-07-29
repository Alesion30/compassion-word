from mlask import MLAsk
import json

value = input()
emotion_analyzer = MLAsk()
result = emotion_analyzer.analyze(value)
print(json.dumps(result))
