import React, { useState } from "react";
import "./App.css";

interface Course {
  id: string;
  name: string;
  grade: string;
  units: number;
}

const getGradePoint = (grade: string): number => {
  switch (grade) {
    case 'A': return 5.0;
    case 'B': return 4.0;
    case 'C': return 3.0;
    case 'D': return 2.0;
    case 'E': return 1.0;
    case 'F': return 0.0;
    default: return 0;
  }
};

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      grade: "A",
      units: 3,
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        return { ...course, [field]: value };
      }
      return course;
    }));
  };

  const calculateGPA = (): string => {
    let totalPoints = 0;
    let totalUnits = 0;

    courses.forEach(course => {
      const gp = getGradePoint(course.grade);
      totalPoints += gp * course.units;
      totalUnits += course.units;
    });

    if (totalUnits === 0) return "0.00";
    return (totalPoints / totalUnits).toFixed(2);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col items-center p-4 md:p-8 bg-gray-900 text-white">
      
      <div className="w-full max-w-3xl flex justify-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-400">GPA Calculator</h1>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 w-full max-w-md text-center border border-gray-700 transform transition-all">
        <h2 className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">Current GPA</h2>
        <div className="text-4xl md:text-5xl font-extrabold text-blue-400 mt-2">{calculateGPA()}</div>
      </div>

      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
        {courses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No courses added yet.</p>
            <p className="text-sm mt-2">Click the "Add Course" button to start.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-gray-700/50 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-all">
                
                <div className="w-full md:flex-1">
                  <label className="block text-xs text-gray-400 mb-1 md:hidden">Course Code</label>
                  <input
                    placeholder="Course Code (e.g. MTH101)"
                    className="w-full p-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-10 gap-2 w-full md:w-auto md:flex md:items-center">
                  
                  <div className="col-span-6 md:w-auto">
                    <label className="block text-xs text-gray-400 mb-1 md:hidden">Grade</label>
                    <div className="relative">
                        <select
                        className="w-full p-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white appearance-none pr-8"
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        >
                        <option value="A">A (5.0)</option>
                        <option value="B">B (4.0)</option>
                        <option value="C">C (3.0)</option>
                        <option value="D">D (2.0)</option>
                        <option value="E">E (1.0)</option>
                        <option value="F">F (0.0)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                  </div>

                  <div className="col-span-3 md:w-auto">
                    <label className="block text-xs text-gray-400 mb-1 md:hidden">Units</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full p-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center bg-gray-800 text-white"
                      value={course.units}
                      onChange={(e) => updateCourse(course.id, 'units', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="col-span-1 flex items-end justify-center md:items-center md:justify-start">
                     <button 
                      onClick={() => removeCourse(course.id)}
                      className="h-[42px] w-[42px] md:h-10 md:w-10 flex items-center justify-center text-red-500 hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30 hover:cursor-pointer"
                      title="Remove Course"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <button
            onClick={addCourse}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            <span className="text-xl">+</span> Add Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;