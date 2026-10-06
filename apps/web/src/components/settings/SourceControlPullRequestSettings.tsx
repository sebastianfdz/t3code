import { DEFAULT_UNIFIED_SETTINGS } from "@t3tools/contracts/settings";
import { Switch } from "../ui/switch";
import { SettingResetButton, SettingsRow, SettingsSection } from "./settingsLayout";
import { searchableSetting } from "./settingsSearch";
import {
  useScopedSettings,
  useScopedSettingsMixed,
  useUpdateScopedSettings,
} from "./useScopedSettings";

export function SourceControlPullRequestSettingsSection() {
  const settings = useScopedSettings();
  const updateSettings = useUpdateScopedSettings();
  const mixed = useScopedSettingsMixed(["createGitHubPullRequestsAsDraft"]);
  const defaultValue = DEFAULT_UNIFIED_SETTINGS.createGitHubPullRequestsAsDraft;

  return (
    <SettingsSection title="Pull requests">
      <SettingsRow
        serverScoped
        settingKeys={["createGitHubPullRequestsAsDraft"]}
        {...searchableSetting("create-github-pull-requests-as-draft")}
        description="Start new GitHub pull requests as drafts. Mark them ready for review when you have finished iterating."
        resetAction={
          mixed || settings.createGitHubPullRequestsAsDraft !== defaultValue ? (
            <SettingResetButton
              label="draft pull requests"
              onClick={() => updateSettings({ createGitHubPullRequestsAsDraft: defaultValue })}
            />
          ) : null
        }
        control={
          <Switch
            mixed={mixed}
            checked={mixed ? false : settings.createGitHubPullRequestsAsDraft}
            onCheckedChange={(checked) =>
              updateSettings({ createGitHubPullRequestsAsDraft: Boolean(checked) })
            }
            aria-label="Create GitHub pull requests as drafts"
          />
        }
      />
    </SettingsSection>
  );
}
