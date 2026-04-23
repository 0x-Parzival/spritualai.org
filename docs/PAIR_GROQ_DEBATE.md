# 🧠 Pair Groq - Multi-Agent Parallel Debate

This document outlines how to implement a high-speed multi-agent debate system for Spiritual AI using Groq's high-inference speed.

## 🚀 The Architecture: Fan-Out/Fan-In

### 1. The Specialist Agents
*   **Agent A: The Seeker (Researcher)** 
    *   *System Prompt:* "You are a master of linguistic psychology. Analyze the user's input for distancing markers ('you' vs 'I'), black-and-white thinking, and MBTI signals. Focus only on the 'as-is' state."
*   **Agent B: The Shadow Witness (Critic)**
    *   *System Prompt:* "You are a Jungian analyst. Look for what the user is NOT saying. Identify the secondary gain of their pattern. Challenge their self-narrative. Be surgically honest."
*   **Agent C: The Sage (Synthesizer)**
    *   *System Prompt:* "You are the orchestrator. You will receive a report from The Seeker and a critique from The Shadow Witness. Harmonize these into a transformative 'Consciousness Blueprint' that offers both validation and a way out."

## 🛠 Framework Integration

### Option 1: LangChain (LangGraph)
LangGraph allows you to define a graph where nodes run in parallel.
```python
workflow = StateGraph(AgentState)
workflow.add_node("researcher", research_node)
workflow.add_node("critic", critic_node)
workflow.add_node("synthesizer", synthesis_node)

# Parallel execution
workflow.add_edge(START, "researcher")
workflow.add_edge(START, "critic")
workflow.add_edge(["researcher", "critic"], "synthesizer")
```

### Option 2: CrewAI
CrewAI is designed specifically for "crews" of agents.
```python
crew = Crew(
  agents=[seeker, shadow_witness, sage],
  tasks=[research_task, critique_task, synthesis_task],
  process=Process.parallel # This is the key for Groq speed
)
```

## ⏱ The "Groq" Advantage
Standard LLMs take 10-20s for a multi-agent debate, which breaks user immersion. 
With **Groq (Llama 3.3 70B)**:
1. Seeker: 800ms
2. Critic: 800ms (Parallel with Seeker)
3. Sage: 1200ms
**Total Time: ~2.0 seconds**

This allows the "Sacred Pause" to be a genuine, multi-perspective analysis that happens in real-time.

## 📈 Next Steps
1. Create a `/api/spiritual/debate` endpoint.
2. Implement the `Promise.all` logic for immediate speed gains.
3. Update the UI to show "Agents debating..." during the progress bar phase.
