import React, { useState } from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import { TOption, TSchema } from '../../../public/interface'
import { SetPostman } from './SetPostman'
import { SetOptions } from './SetOptions'


export function Options(props: React.PropsWithChildren<{
  options: TOption[],
  activeSchema: React.MutableRefObject<TSchema>,
  schemaListOptions: TOption[],
  handleChange: (value: any) => void
}>){
  const { options, activeSchema, schemaListOptions, handleChange }= props
  const postman= activeSchema.current.postman
  const [setType, setSetType]= useState(postman ? 'SetPostman' : 'SetOptions')

  const onChangeType= (e: RadioChangeEvent) => {
    const type= e.target.value
    if(type === 'SetOptions'){ activeSchema.current.postman= null }
    setSetType(type)
  }

  return (
    <div>
      <strong>options：</strong>
      <Radio.Group size="small" value={setType} buttonStyle="solid" onChange={onChangeType}>
        <Radio.Button value="SetOptions">静态数据</Radio.Button>
        <Radio.Button value="SetPostman">远程数据</Radio.Button>
      </Radio.Group>
      <div className="configs-setting-area">
        {
          setType === 'SetOptions' ? 
            <SetOptions options={options} handleChange={handleChange} />
            :
            <SetPostman activeSchema={activeSchema} schemaListOptions={schemaListOptions} />
        }
      </div>
    </div>
  )
}