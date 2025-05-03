def normalize_pregnancy_stage(stage):
    """Normalize user input for pregnancy stage to match nudge keys."""
    stage_mapping = {
        "1": "1st trimester",
        "1st": "1st trimester",
        "first": "1st trimester",
        "2": "2nd trimester",
        "2nd": "2nd trimester",
        "second": "2nd trimester",
        "3": "3rd trimester",
        "3rd": "3rd trimester",
        "third": "3rd trimester"
    }
    # Normalize input to lowercase and find a match
    normalized_stage = stage.lower().strip()
    return stage_mapping.get(normalized_stage, stage)  # Fall back to the original input if not found

def get_nudge(pregnancy_stage):
    """Provide proactive suggestions based on the user's pregnancy stage."""
    # Normalize the stage to match the keys in the nudges dictionary
    normalized_stage = normalize_pregnancy_stage(pregnancy_stage)
    nudges = {
        "1st trimester": "Remember to take folic acid supplements daily and stay hydrated!",
        "2nd trimester": "Consider light exercises like walking or yoga to stay active.",
        "3rd trimester": "Prepare your hospital bag and discuss your birth plan with your doctor."
    }
    return nudges.get(normalized_stage, "Stay healthy and consult regularly with your doctor!")
