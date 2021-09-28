import React, { useReducer } from 'react'
import { Button, Divider, Input, InputNumber, Popover, Radio, Space } from 'antd';

const reducer= (state: any, action: any) => ({
  ...state,
  [action.type]: action.payload,
})


export function ConfigWordsLimit(props: React.PropsWithChildren<{
  wordsLimit: any,
  forceRender: () => void,
}>){
  const { wordsLimit, forceRender }= props
  const { max, min, message, rules }= wordsLimit
  const [CurrentRules, dispatch]= useReducer(reducer, rules)

  const handleChangeRules= (type: 'zh' | 'others' | 'blank', payload: any) => {
    rules[type]= payload
    dispatch({type, payload})
    forceRender()
  }

  const handleChangePropValue= (propName: string, newValue: any) => {
    wordsLimit[propName]= newValue
    forceRender()
  }

  return (
    <div>
      <strong>wordsLimit：</strong>
      <Popover trigger="click" content={
        <div className="words-count-configs-content">
          <div>
            <span className="title">汉字：</span>
            <Radio.Group onChange={e => handleChangeRules('zh', e.target.value)} value={CurrentRules.zh}>
              <Radio value={1}>1个</Radio>
              <Radio value={2}>2个</Radio>
            </Radio.Group>
          </div>
          <Divider />
          <div>
            <span className="title">其它字符：</span>
            <Radio.Group onChange={e => handleChangeRules('others', e.target.value)} value={CurrentRules.others}>
              <Radio value={0.5}>0.5个</Radio>
              <Radio value={1}>1个</Radio>
            </Radio.Group>
          </div>
          <Divider />
          <div>
            <span className="title">空格：</span>
            <Radio.Group onChange={e => handleChangeRules('blank', e.target.value)} value={CurrentRules.blank}>
              <Radio value={true}>包含</Radio>
              <Radio value={false}>不包含</Radio>
            </Radio.Group>
          </div>
        </div>
        }>
        <Button type="link" size="small">字符数统计规则</Button>
      </Popover>
      <div className="configs-area">
        <Space>
          <strong>max：</strong>
          <InputNumber min={1} defaultValue={max} onChange={value => handleChangePropValue('max', value)} bordered={false} />
        </Space>
        <Space>
          <strong>min：</strong>
          <InputNumber min={0} defaultValue={min} onChange={value => handleChangePropValue('min', value)} bordered={false} />
        </Space>
        <Space>
          <strong>message：</strong>
          <Input prefix='"' suffix='"' defaultValue={message} onChange={e => handleChangePropValue('message', e.target.value)} />
        </Space>
      </div>
    </div>
  )
}