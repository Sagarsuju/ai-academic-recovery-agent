import os
import sys
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test 1: POST /api/rag/query
r1 = client.post('/api/rag/query', json={'question': 'What is the attendance policy for recovery classes?'})
assert r1.status_code == 200, f'Status {r1.status_code}: {r1.text}'
data1 = r1.json()
print('=== /api/rag/query RESULT ===')
print('Answer:\n', data1['answer'])
print('\nSources:\n', data1['sources'])
assert 'attendance_policy.txt' in data1['sources'], 'attendance_policy.txt missing in sources'
assert '3.1 Students with attendance between 60% and 74%' in data1['answer'], 'Policy 3.1 missing in answer'

# Test 2: POST /ai-assistant/query
r2 = client.post('/ai-assistant/query', json={'query': 'What is the attendance policy for recovery classes?'})
assert r2.status_code == 200, f'Status {r2.status_code}: {r2.text}'
data2 = r2.json()
print('\n=== /ai-assistant/query RESULT ===')
print('Tool Used:', data2.get('tool_used'))
print('Answer:\n', data2['answer'])
print('\nSources:\n', data2['sources'])
assert data2.get('tool_used') in ['answer_from_kb', 'query_knowledge_base'], f'Expected tool query_knowledge_base/answer_from_kb, got {data2.get("tool_used")}'
assert 'attendance_policy.txt' in data2['sources'], 'attendance_policy.txt missing in assistant sources'

# Test 3: Unknown query
r3 = client.post('/api/rag/query', json={'question': 'What are the rules for hostel gym membership?'})
assert r3.status_code == 200, f'Status {r3.status_code}: {r3.text}'
data3 = r3.json()
print('\n=== /api/rag/query UNKNOWN RESULT ===')
print('Answer:', data3['answer'])
print('Sources:', data3['sources'])
assert "don't have that information in the university knowledge base" in data3['answer'], 'Fallback answer missing'
assert len(data3['sources']) == 0, 'Sources should be empty for unknown question'

print('\nALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!')
