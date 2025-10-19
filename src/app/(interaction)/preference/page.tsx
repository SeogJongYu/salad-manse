import PreferenceStepFlow from '@/features/preference/components/organisms/PreferenceStepFlow';
import { PreferenceStoreProvider } from '@/features/preference/providers/PreferenceStoreProvider';

export default function PreferencePage() {
  return (
    <div className="h-(--content-height) px-4 pt-4 pb-[60px]">
      <PreferenceStoreProvider>
        <PreferenceStepFlow />
      </PreferenceStoreProvider>
    </div>
  );
}
