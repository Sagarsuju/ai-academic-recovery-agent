import os
import sys
import json

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
backend_dir = os.path.join(root_dir, "backend")
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from ai_agent.agent import AcademicRecoveryAgent

def run_conversations():
    agent = AcademicRecoveryAgent()
    session_id = "test_conversation_session_1"

    print("=" * 80)
    print("CONVERSATION 1: 'Is CS301 on track to finish the syllabus on time?'")
    print("=" * 80)
    res1 = agent.handle_query("Is CS301 on track to finish the syllabus on time?", session_id=session_id)
    print("\n[STRICT JSON CONTRACT]:")
    print(json.dumps(res1["final_output"], indent=2))
    print("\n[CHAT UI ANSWER]:\n" + res1["answer"])
    print("\n[TOOL USED]:", res1["tool_used"])
    print("[SOURCES]:", res1["sources"])

    print("\n" + "=" * 80)
    print("CONVERSATION 2: 'It's at risk — generate a recovery plan and find available slots for extra classes.'")
    print("=" * 80)
    res2 = agent.handle_query("It's at risk — generate a recovery plan and find available slots for extra classes.", session_id=session_id)
    print("\n[STRICT JSON CONTRACT]:")
    print(json.dumps(res2["final_output"], indent=2))
    print("\n[CHAT UI ANSWER]:\n" + res2["answer"])
    print("\n[TOOL USED]:", res2["tool_used"])
    print("[SOURCES]:", res2["sources"])

    print("\n" + "=" * 80)
    print("CONVERSATION 3: 'What is our policy on recovery classes and minimum attendance?'")
    print("=" * 80)
    res3 = agent.handle_query("What is our policy on recovery classes and minimum attendance?", session_id=session_id)
    print("\n[STRICT JSON CONTRACT]:")
    print(json.dumps(res3["final_output"], indent=2))
    print("\n[CHAT UI ANSWER]:\n" + res3["answer"])
    print("\n[TOOL USED]:", res3["tool_used"])
    print("[SOURCES]:", res3["sources"])

    # Assertions to ensure strict adherence to requirements
    # 1. Conversation 1: CS301 progress tracking
    assert res1["intent"] == "query_progress"
    assert "predict_completion" in res1["tool_calls_needed"]
    assert res1["final_output"]["data"]["prediction"]["course_code"] == "CS301"

    # 2. Conversation 2: Recovery plan & timetable slots
    assert res2["intent"] == "generate_recovery"
    assert "generate_recovery_plan" in res2["tool_calls_needed"]
    assert "find_timetable_slots" in res2["tool_calls_needed"]
    assert len(res2["final_output"]["data"]["recommended_slots"]) >= 3

    # 3. Conversation 3: Pure policy routed ONLY to query_knowledge_base
    assert res3["intent"] == "general_academic"
    assert res3["tool_calls_needed"] == ["query_knowledge_base"]
    assert len(res3["sources"]) > 0

    print("\n" + "#" * 80)
    print("ALL 3 CONVERSATION WORKFLOW ASSERTIONS PASSED SUCCESSFULLY!")
    print("#" * 80)

if __name__ == "__main__":
    run_conversations()
