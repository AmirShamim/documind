import time
import requests
import json

doc_id = '2fcd103b5720469480be2598b1d51b92'

# Check after much longer wait
print('Waiting for insights generation...')
for i in range(23):
    time.sleep(2)
    response = requests.get(f'http://127.0.0.1:8000/insights/{doc_id}')
    if response.status_code == 200:
        insights_data = response.json()
        if isinstance(insights_data, dict) and insights_data.get('status') == 'ready':
            print('\nInsights ready!')
            print(json.dumps(insights_data, indent=2))
            break
        status = insights_data.get('status', 'unknown')
        print(f'  Attempt {i+1}/23 ({status})')
else:
    response = requests.get(f'http://127.0.0.1:8000/insights/{doc_id}')
    print('\nFinal response:')
    print(json.dumps(response.json(), indent=2))
