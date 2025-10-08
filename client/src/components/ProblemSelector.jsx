import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, List, Shuffle } from 'lucide-react'
import { getAllProblems, getRandomProblem } from '../data/problems'
import './ProblemSelector.css'

function ProblemSelector({ category, currentProblemId, onProblemChange }) {
  const [problems, setProblems] = useState([])
  const [showList, setShowList] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, easy, medium, hard

  useEffect(() => {
    fetchProblems()
  }, [category])

  const fetchProblems = async () => {
    try {
      const data = getAllProblems(category)
      setProblems(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching problems:', error)
      setLoading(false)
    }
  }

  const filteredProblems = filter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === filter)

  const currentIndex = problems.findIndex(p => p.id === currentProblemId)
  const currentProblem = problems[currentIndex]

  const goToPrevious = () => {
    if (currentIndex > 0) {
      onProblemChange(problems[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < problems.length - 1) {
      onProblemChange(problems[currentIndex + 1])
    }
  }

  const selectRandom = async () => {
    try {
      const problem = getRandomProblem(category, filter !== 'all' ? filter : null)
      if (problem) {
        onProblemChange(problem)
        setShowList(false)
      }
    } catch (error) {
      console.error('Error getting random problem:', error)
    }
  }

  if (loading) {
    return <div className="problem-selector-loading">Loading problems...</div>
  }

  return (
    <div className="problem-selector">
      <div className="selector-header">
        <div className="problem-info">
          <span className="problem-count">
            Problem {currentIndex + 1} of {problems.length}
          </span>
          <span className={`difficulty-badge difficulty-${currentProblem?.difficulty}`}>
            {currentProblem?.difficulty}
          </span>
        </div>

        <div className="selector-controls">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="nav-btn"
            title="Previous Problem"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setShowList(!showList)}
            className="nav-btn"
            title="Problem List"
          >
            <List size={20} />
          </button>

          <button
            onClick={selectRandom}
            className="nav-btn"
            title="Random Problem"
          >
            <Shuffle size={20} />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex === problems.length - 1}
            className="nav-btn"
            title="Next Problem"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {showList && (
        <div className="problem-list-modal">
          <div className="problem-list-content">
            <div className="list-header">
              <h3>Select a Problem</h3>
              <div className="filter-buttons">
                <button
                  onClick={() => setFilter('all')}
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                >
                  All ({problems.length})
                </button>
                <button
                  onClick={() => setFilter('easy')}
                  className={`filter-btn ${filter === 'easy' ? 'active' : ''}`}
                >
                  Easy ({problems.filter(p => p.difficulty === 'easy').length})
                </button>
                <button
                  onClick={() => setFilter('medium')}
                  className={`filter-btn ${filter === 'medium' ? 'active' : ''}`}
                >
                  Medium ({problems.filter(p => p.difficulty === 'medium').length})
                </button>
                <button
                  onClick={() => setFilter('hard')}
                  className={`filter-btn ${filter === 'hard' ? 'active' : ''}`}
                >
                  Hard ({problems.filter(p => p.difficulty === 'hard').length})
                </button>
              </div>
            </div>

            <div className="problem-grid">
              {filteredProblems.map((problem, index) => (
                <button
                  key={problem.id}
                  onClick={() => {
                    onProblemChange(problem)
                    setShowList(false)
                  }}
                  className={`problem-item ${problem.id === currentProblemId ? 'active' : ''}`}
                >
                  <div className="problem-number">#{problem.id}</div>
                  <div className="problem-title">{problem.title}</div>
                  <div className={`problem-difficulty difficulty-${problem.difficulty}`}>
                    {problem.difficulty}
                  </div>
                  <div className="problem-points">{problem.points} pts</div>
                </button>
              ))}
            </div>

            <button onClick={() => setShowList(false)} className="close-list-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProblemSelector

