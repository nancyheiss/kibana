/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { useCallback, useMemo } from 'react';
import { ResolvedLogSourceConfiguration } from '../../../../common/log_sources';
import { useLogIndicesConfigurationFormState } from './indices_configuration_form_state';
import { useLogColumnsConfigurationFormState } from './log_columns_configuration_form_state';

export const useLogSourceConfigurationFormState = (
  configuration?: ResolvedLogSourceConfiguration
) => {
  const indicesConfigurationFormState = useLogIndicesConfigurationFormState({
    initialFormState: useMemo(
      () =>
        configuration
          ? {
              name: configuration.name,
              description: configuration.description,
              logAlias: configuration.indices,
              tiebreakerField: configuration.tiebreakerField,
              timestampField: configuration.timestampField,
            }
          : undefined,
      [configuration]
    ),
  });

  const logColumnsConfigurationFormState = useLogColumnsConfigurationFormState({
    initialFormState: useMemo(
      () =>
        configuration
          ? {
              logColumns: configuration.columns,
            }
          : undefined,
      [configuration]
    ),
  });

  const errors = useMemo(
    () => [...indicesConfigurationFormState.errors, ...logColumnsConfigurationFormState.errors],
    [indicesConfigurationFormState.errors, logColumnsConfigurationFormState.errors]
  );

  const resetForm = useCallback(() => {
    indicesConfigurationFormState.resetForm();
    logColumnsConfigurationFormState.resetForm();
  }, [indicesConfigurationFormState, logColumnsConfigurationFormState]);

  const isFormDirty = useMemo(
    () => indicesConfigurationFormState.isFormDirty || logColumnsConfigurationFormState.isFormDirty,
    [indicesConfigurationFormState.isFormDirty, logColumnsConfigurationFormState.isFormDirty]
  );

  const isFormValid = useMemo(
    () => indicesConfigurationFormState.isFormValid && logColumnsConfigurationFormState.isFormValid,
    [indicesConfigurationFormState.isFormValid, logColumnsConfigurationFormState.isFormValid]
  );

  const formState = useMemo(
    () => ({
      name: indicesConfigurationFormState.formState.name,
      description: indicesConfigurationFormState.formState.description,
      logAlias: indicesConfigurationFormState.formState.logAlias,
      fields: {
        tiebreaker: indicesConfigurationFormState.formState.tiebreakerField,
        timestamp: indicesConfigurationFormState.formState.timestampField,
      },
      logColumns: logColumnsConfigurationFormState.formState.logColumns,
    }),
    [indicesConfigurationFormState.formState, logColumnsConfigurationFormState.formState]
  );

  const formStateChanges = useMemo(
    () => ({
      name: indicesConfigurationFormState.formStateChanges.name,
      description: indicesConfigurationFormState.formStateChanges.description,
      logAlias: indicesConfigurationFormState.formStateChanges.logAlias,
      fields: {
        tiebreaker: indicesConfigurationFormState.formStateChanges.tiebreakerField,
        timestamp: indicesConfigurationFormState.formStateChanges.timestampField,
      },
      logColumns: logColumnsConfigurationFormState.formStateChanges.logColumns,
    }),
    [
      indicesConfigurationFormState.formStateChanges,
      logColumnsConfigurationFormState.formStateChanges,
    ]
  );

  return {
    addLogColumn: logColumnsConfigurationFormState.addLogColumn,
    moveLogColumn: logColumnsConfigurationFormState.moveLogColumn,
    errors,
    formState,
    formStateChanges,
    isFormDirty,
    isFormValid,
    indicesConfigurationProps: indicesConfigurationFormState.fieldProps,
    logColumnConfigurationProps: logColumnsConfigurationFormState.logColumnConfigurationProps,
    resetForm,
  };
};
