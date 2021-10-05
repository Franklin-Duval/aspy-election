import { Space } from 'antd';
import { maxBy, sampleSize, sumBy } from 'lodash';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaAngleRight } from 'react-icons/fa';
import { CandidateEntity } from 'server/modules/candidate/entities/candidate.entity';
import { PostEntity } from 'server/modules/post/entities/post.entity';
import { VoteEntity } from 'server/modules/votes/entities/votes.entity';
import { fetchCandidates } from 'src/modules/candidate/network/candidate.network';
import { Layout } from 'src/modules/shared/Layout';
import { COLORS } from 'src/shared/colors';
import { fetchPosts, fetchVotes } from '../network/admin.network';

type PostCandidates = {
  post: PostEntity;
  candidates: CandidateEntity[];
};

export const ResultPage = () => {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [votes, setVotes] = useState<VoteEntity[]>([]);
  const [candidates, setCandidates] = useState<CandidateEntity[]>([]);
  const [postCandidates, setPostCandidates] = useState<PostCandidates[]>([]);

  useEffect(() => {
    let tempPost: PostEntity[] = [];
    let tempCandidate: CandidateEntity[] = [];
    const fetchData = async () => {
      await fetchPosts().then((posts) => {
        setPosts(posts);
        tempPost = posts;
      });
      await fetchCandidates().then((candidates) => {
        setCandidates(candidates);
        tempCandidate = candidates;
      });
      await fetchVotes().then((votes) => setVotes(votes));
    };
    fetchData().then(() => {
      let listPostCand: PostCandidates[] = [];
      for (let post of tempPost) {
        let postCandidate = { post: post, candidates: [] } as PostCandidates;
        for (let candidate of tempCandidate) {
          if (candidate.post == post._id) {
            postCandidate.candidates.push(candidate);
          }
        }
        listPostCand.push(postCandidate);
      }
      console.log(listPostCand);
      setPostCandidates(listPostCand);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {postCandidates.map((item) => (
        <div key={item.post._id}>
          <Space>
            <FaAngleRight color='red' size={25} />
            <h2>{item.post.name} </h2>
          </Space>
          {item.candidates.length == 0 ? (
            <h3>No candidate</h3>
          ) : (
            <div>
              <Pie
                data={{
                  labels: item.candidates
                    .map((cand) => `${cand.name} ${cand.surename}`)
                    .concat('Empty Vote'),
                  datasets: [
                    {
                      data: item.candidates
                        .map((cand) => cand.numberVotes)
                        .concat(
                          votes.filter(
                            (vote) =>
                              vote.post == item.post._id &&
                              vote.candidate == '----',
                          ).length,
                        ),
                      backgroundColor: sampleSize(
                        COLORS,
                        item.candidates.length + 1,
                      ),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 3,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        padding: 40,
                      },
                    },
                  },
                }}
              />
              <div style={{ marginBottom: 50 }}>
                <h2>Winner</h2>
                <h3>
                  {
                    maxBy(item.candidates, function (o) {
                      return o.numberVotes;
                    })?.name
                  }{' '}
                  {
                    maxBy(item.candidates, function (o) {
                      return o.numberVotes;
                    })?.surename
                  }
                  {' : '}
                  <span style={{ fontSize: 20, color: 'red' }}>
                    {Math.round(
                      ((maxBy(item.candidates, function (o) {
                        return o.numberVotes;
                      })?.numberVotes as number) /
                        (sumBy(item.candidates, function (o) {
                          return o.numberVotes;
                        }) +
                          votes.filter(
                            (vote) =>
                              vote.post == item.post._id &&
                              vote.candidate == '----',
                          ).length)) *
                        10000,
                    ) / 100}
                    %
                  </span>
                </h3>
                <hr />
              </div>
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};
