import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@src/store'

export default function useFiles() {
  const files = useSelector((store: AppStore) => store.files)
  return files
}
