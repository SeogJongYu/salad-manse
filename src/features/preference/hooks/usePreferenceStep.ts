import { usePreferenceStore } from '@/features/preference/providers/PreferenceStoreProvider';
import { useQueryState } from '@/shared/hooks/useQueryState';

export function usePreferenceStep() {
  const preferenceData = usePreferenceStore(state => state.data);
  const setField = usePreferenceStore(state => state.setField);
  const [queryState, setQueryState] = useQueryState<{ step: string }>();
  const currentStep = Number(queryState.step) || 1;

  function handlePrevious() {
    setQueryState(prev => ({
      ...prev,
      step: String(Number(prev.step) - 1),
    }));
  }

  function handleNext(key: keyof typeof preferenceData, value: string) {
    setField(key, value);
    setQueryState(prev => ({ ...prev, step: String(Number(prev.step) + 1) }));
  }

  return {
    currentStep,
    handlePrevious,
    handleNext,
    preferenceData,
    setField,
  };
}
