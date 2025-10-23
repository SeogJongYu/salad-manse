import { Suspense, unstable_ViewTransition as ViewTransition } from 'react';

import PreferenceContainer from '@/features/preference/components/PreferenceContainer';

export default function PreferencePage() {
  return (
    <div className="container mx-auto h-(--content-height) px-4 pt-4 pb-[60px]">
      <ViewTransition>
        <Suspense>
          <PreferenceContainer />
        </Suspense>
      </ViewTransition>
    </div>
  );
}
