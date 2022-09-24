import { Form, Input, Select } from 'antd'
interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={evt => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={value => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map(user => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default SearchPanel
