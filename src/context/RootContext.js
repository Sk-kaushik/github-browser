import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const RootContext = createContext();

export const useRootContext = () => {
  return useContext(RootContext);
};

export const RootContextProvider = (props) => {
  const [repoList, setRepoList] = useState(null);
  const [branchesList, setBranchesList] = useState(null);
  const [issuesList, setIssuesList] = useState(null);
  const [commitsList, setCommitsList] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.github.com/users/knoxpo/repos`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setRepoList(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getBranches = useCallback((name) => {
    if (name) {
      setLoading(true);
      fetch(`https://api.github.com/repos/knoxpo/${name}/branches`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setLoading(false);
          setBranchesList(data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setBranchesList(null);
    }
  }, []);

  const getIssues = useCallback((name) => {
    if (name) {
      setLoading(true);
      fetch(`https://api.github.com/repos/knoxpo/${name}/issues`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setLoading(false);
          setIssuesList(data);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setIssuesList(null);
    }
  }, []);

  const getCommits = useCallback((name, branch_name) => {
    setLoading(true);
    fetch(`https://api.github.com/repos/knoxpo/${name}/commits?sha=${branch_name}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setLoading(false);
        setCommitsList(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const addRepo = ({ owner, repoName, desc }) => {
    setRepoList([...repoList, { id: uuidv4(), full_name: `${owner}  / ${repoName}`, description: desc }]);
  };

  const deleteRepo = (name) => {
    if (repoList) {
      setRepoList(repoList.filter((item) => item.full_name.split("/")[1] !== name));
    }
  };

  const value = { repoList, branchesList, issuesList, loading, commitsList, getBranches, getIssues, getCommits, addRepo, deleteRepo };
  return <RootContext.Provider value={value}>{props.children}</RootContext.Provider>;
};
