const resumeList = [
  {
    time: '2016.05 ~ 2016.06',
    content: '커먼게임즈 대표'
  },
  {
    time: '2018.09 ~',
    content: '앳더모먼트 대표'
  },
  {
    time: '2020.10 ~ 2020.11',
    content: '앳더모먼트 대표'
  },

]
const Resume = () => {
  const generate = () => {
    return resumeList.map((data, index) => createList(data, index))
  }

  const createList = (data, index) => {
    return <li key = {index}>
      <div>{data.time}</div>
      <div>{data.content}</div>
    </li>
  }

  return (
    <div className="hov-profile-resume-wrapper">
      <ul className="hov-profile-resume">
        {generate()}
      </ul>
    </div>
  );
}

export default Resume;