import { ButtonNoPadding } from '@/components/lib'
import Pin from '@/components/pin'
import { Project } from '@/types/project'
import { User } from '@/types/user'
import { useDeleteProject, useEditProject } from '@/utils/project'
import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useProjectModal, useProjectsQueryKey } from './util'

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  return (
    <Table
      rowKey={'id'}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          }
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`${project.id}`} replace={true}>
                {project.name}
              </Link>
            )
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find(user => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : null}
              </span>
            )
          }
        },
        {
          title: '操作',
          render(value, project) {
            return <More project={project} />
          }
        }
      ]}
      pagination={false}
      {...props}
    ></Table>
  )
}

export default List

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确认删除?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({ id })
      }
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key="edit">
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key="delete"
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
