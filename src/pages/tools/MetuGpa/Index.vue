<template>
    <Layout :show-logo="true"  :show-footer-absolute="false">
        <h1 class="metugpa__header1">Simple GPA Calculator <span style="color: red">v2</span></h1>
        <p class="metugpa__header2">for METU</p>
        <p class="metugpa__header3">For all departments and semesters now :)</p>

        <div class="metugpa__loader-sect" v-if="!loaded">
          <p>Loading...</p>
        </div>

        <div class="metugpa__main-sect" v-if="loaded">
          <div class="metugpa__dept-select-gr">
              <p>Department:</p>
              <select class="metugpa__dept-select" v-model="selected_dept" v-on:change="update_table()">
                <option v-for="(_, dept, index) in depts" :value="dept" :key="index">{{dept}}</option>
              </select>

              <p v-if="selected_dept !== undefined">Semester:</p>
              <select v-if="selected_dept !== undefined" class="metugpa__semester-select" v-model="selected_semester" v-on:change="update_table()">
                <option v-for="(_, semester, index) in depts[selected_dept].courses" :value="semester" :key="index">{{semester}}</option>
              </select>
          </div>

          <table class="metugpa__grade-tab" v-if="selected_dept !== undefined && selected_semester !== undefined">
              <tr>
                <th></th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="course_code in current_courses" :key="course_code">
                <td>
                  <button class="metugpa__delete_course_button" @click="remove_course_from_currents(course_code)">
                    Remove
                    <!--<img class="metugpa__delete_course_button__image" src="/icons8-trash-24.png" alt="Remove course">-->
                  </button>
                </td>
                <td>{{course_code}}</td>
                <td>{{courses[course_code].name}}</td>
                <td>{{courses[course_code].credit}}</td>
                <td>
                    <select class="metugpa__tb-sel" @change="update_course_and_gpa(course_code, $event)">
                      <option value="4">AA</option>
                      <option value="3.5">BA</option>
                      <option value="3">BB</option>
                      <option value="2.5">CB</option>
                      <option value="2">CC</option>
                      <option value="1.5">DC</option>
                      <option value="1">DD</option>
                      <option value="0.5">FD</option>
                      <option value="0">FF</option>
                      <option value="0">NA</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td colspan="2">
                  <input class="metugpa__add-course-input" type="text" placeholder="Type to search and add courses..." v-model="course_search_query" @input="update_course_search_results" @change="update_course_search_results">
                  <div class="metugpa__add-course-results" v-if="show_course_search_results">
                    <div class="metugpa__add-course-results__result" v-for="(res, index) in course_search_results" :key="index" @click="add_course(res.code)">
                      {{res.repr}}
                      <hr>
                    </div>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
          </table>

          <div class="metugpa__sect-bottom">
            <button class="metugpa__clear" type="button" @click="clear_table()">CLEAR</button>
            <p class="metugpa__grader-txt">Your GPA : <span style="font-weigth: bold" :class="{metugpa__gpa_high: gpa >= 3.5, metugpa__gpa_ok: gpa < 3.5 && gpa >= 2.5, metugpa__gpa_low: gpa < 2.5}">{{gpa}}</span></p>
          </div>
        </div>
    </Layout>
</template>

<script>
import course_data from './__courses';
import department_data from './__depts';

export default {
    data() {
        return {
            depts: department_data,
            courses: course_data,
            selected_dept: "Computer Engineering",
            selected_semester: 3,
            loaded: false,
            courses_holder: [],
            current_courses: [],
            gpa: 4,
            course_search_query: "",
            course_search_results: []
        }
    },
    computed: {
      show_course_search_results() {
        if (this.course_search_query != "" && this.course_search_results.length > 0) {
          return true;
        }

        return false;
      }
    },
    methods: {
      update_table() {
        var vm = this;
        
        this.courses_holder = {};
        this.current_courses = [];

        this.depts[this.selected_dept].courses[this.selected_semester].forEach(element => {
          vm.courses_holder[element] = {
            credit: vm.courses[element].credit,
            grade: 4
          }
          vm.current_courses.push(element)
        });
      },
      remove_course_from_currents(course_code) {
        this.current_courses.splice(this.current_courses.indexOf(course_code), 1);
        delete this.courses_holder[course_code];
        this.update_gpa();
      },
      add_course(code) {
        this.current_courses.push(code);
        this.courses_holder[code] = {
            credit: this.courses[code].credit,
            grade: 4
          }
        this.course_search_query = "";
        this.course_search_results = [];
        this.update_gpa();
      },
      update_course_and_gpa(ccode, event) {
        this.courses_holder[ccode].grade = Number(event.target.value)
        this.update_gpa()
      },
      update_gpa() {
        if (this.courses_holder.length == 0)
          return 4;
      
        let _grad = 0;
        let _cred = 0;

        Object.values(this.courses_holder).forEach(course => {
          _cred += course.credit;
          _grad += course.grade * course.credit;
        })

        this.gpa = (_grad/_cred).toFixed(2)
      },
      update_course_search_results() {
        let query = this.course_search_query.toLowerCase();

        console.log(query);

        this.course_search_results = [];

        for (var course_code in this.courses) {
          if (course_code.toLowerCase().includes(query) || this.courses[course_code].name.toLowerCase().includes(query)) {
            if (!this.current_courses.includes(course_code)) {
              this.course_search_results.push({
                code: course_code,
                repr: course_code + " - " + this.courses[course_code].name
              })
            }
          }
        }
      },
      clear_table() {
        var vm = this;

        Object.keys(this.courses_holder).forEach(course => {
          vm.courses_holder[course].grade = 4
        })

        for (let elm of document.getElementsByClassName("metugpa__tb-sel")) {
          elm.value = 4;
        }

        this.gpa = 4;
      }
    },
    mounted() {
        this.loaded = true;
        this.update_table();
    },
    metaInfo () {
        return {
            title: 'Sazak\'s METU GPA Calculator',
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content: 'Sazak\'s METU GPA Calculator - A simple GPA calculator for METU students'
                }
            ]
        }
    }
}
</script>

<style <style lang="scss">
.metugpa {
  &__header1 {
    font-size: 28px;
    font-family: 'Black Han Sans', sans-serif;
    text-align: center;
    margin-bottom: 5px;
  }

  &__header2 {
    font-size: 16px;
    font-family: 'Chakra Petch', sans-serif;
    text-align: center;
  }

  &__header3 {
    font-size: 14px;
    font-family: 'Chakra Petch', sans-serif;
    text-align: center;

    margin-top: 5px;
  }

  &__dept-select-gr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px 0;
  }

  &__dept-select-gr * {
    margin: 0 10px;
  }

  &__dept-select {
    width: 300px;
    height: 35px;
    text-align: center;
  }

  &__semester-select {
    width: 100px;
    height: 35px;
    text-align: center;
  }

  &__grade-tab {
    text-align: left;
    margin: auto;
  }

  &__grade-tab th,td {
    padding: 8px 32px;
    padding-left: 0;
  }

  &__grade-tab td {
    font-size: 14px;
    padding-right: 32px;
  }

  /*&__delete_course_button {
    width: 25px;
    height: 25px;
    padding: 0;

    &__image {
      width: 20px;
    }
  }*/

  &__tb-sel {
    width: 54px;
    height: 28px;
    margin-bottom: 4px;
  }

  &__add-course-input {
    width: 100%;
    border-radius: 8px;
    padding-left: 16px;
    height: 30px;
    text-align: left;
    margin-top: 10px;
  }

  &__add-course-results {
    max-height: 200px;
    overflow-y: scroll;
    margin-top: 10px;

    &__result:hover {
      cursor: pointer;
    }
  }

  &__sect-bottom {
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    margin: auto;
    margin-top: 50px;
  }

  &__grader-txt {
    font-size: 20px;
    font-family: 'Chakra Petch', sans-serif
  }

  &__grader-txt span {
    margin: 3px;
    font-weight: bolder;
    font-size: 24px;
  }

  &__sect-bottom button {
    width: 72px;
    height: 36px;
  }

  &__clear {
    border: 2px solid red;
    border-radius: 8px;
    color: red;
  }

  &__gpa_high {
    color: #7CFC00;
  }

  &__gpa_ok {
    color: #FFD700;
  }

  &__gpa_low {
    color: #FF0000;
  }

  &__github-link {
    background-color: #222;
    font-size: 15px;
    height: 32px;
  }

  &__github-link a {
    color: red;
  }

  @media screen and (max-width: 400px) {
    &__grade-tab td, &__tb-sel {
      font-size: 12px;
    }

    &__grade-tab th {
      font-size: 14px;
    }
  }
}
</style>
