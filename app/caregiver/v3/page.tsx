import { SourceArtifactRuntime } from "@/components/parent-caregiver-v3/source-artifact-runtime";
import { loadParentCaregiverV3Source } from "@/lib/parent-caregiver-v3/source-loader";

export default async function CaregiverV3Page() {
  const source = await loadParentCaregiverV3Source();

  return (
    <SourceArtifactRuntime
      markup={source.markup}
      logic={source.logic}
      styles={source.styles}
      initialState={{ role: "caregiver", cScreen: "today" }}
    />
  );
}
