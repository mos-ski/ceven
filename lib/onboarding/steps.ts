import type { OnboardingAnswers, StepId } from "./types";

function resolveTrackSteps(answers: OnboardingAnswers): StepId[] {
  if (answers.persona === "admin") {
    return [
      "admin-capacity",
      "admin-locations",
      "admin-current-tools",
      "admin-staff-count",
      "admin-email",
    ];
  }

  if (answers.persona === "parent") {
    const steps: StepId[] = ["parent-intent"];
    const wantsCreche = answers.parentIntent === "creche" || answers.parentIntent === "both";
    const wantsCaregiver = answers.parentIntent === "caregiver" || answers.parentIntent === "both";

    if (wantsCreche) {
      steps.push("parent-creche-search", "parent-creche-children");
    }
    if (wantsCaregiver) {
      steps.push("parent-caregiver-has-one");
      if (!wantsCreche) {
        // "how many children" is only asked once; the creche sub-branch already covers it under "both"
        steps.push("parent-caregiver-children");
      }
      steps.push("parent-caregiver-care-type", "parent-caregiver-location");
    }
    steps.push("parent-final");
    return steps;
  }

  if (answers.persona === "caregiver") {
    if (answers.hasFamily === true) {
      return ["caregiver-has-family", "caregiver-final"];
    }
    if (answers.hasFamily === false) {
      return [
        "caregiver-has-family",
        "caregiver-experience",
        "caregiver-location",
        "caregiver-availability",
        "caregiver-age-groups",
        "caregiver-final",
      ];
    }
    return ["caregiver-has-family"];
  }

  return [];
}

export function resolveFullPath(answers: OnboardingAnswers): StepId[] {
  if (!answers.persona) return ["persona-select"];
  return ["persona-select", ...resolveTrackSteps(answers)];
}
