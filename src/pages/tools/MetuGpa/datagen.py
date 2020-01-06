import os
import json

import requests
from lxml import html

catalog_metu_base_uri = "https://catalog.metu.edu.tr/"

available_faculties = [
    100,
    200,
    300,
    400,
    500,
]

def get_department_uris():
    uris = list()

    for fac_id in available_faculties:
        fac_uri = catalog_metu_base_uri + f"fac_inst.php?fac_inst={fac_id}"

        print(f"\n[i] Starting to crawl {fac_uri}")

        res = requests.get(fac_uri)

        if res.status_code != 200:
            print(f"[!!] Status code returned {res.status_code}. Terminating.")
            exit(1)

        tree = html.fromstring(res.text)

        for dept_link in tree.xpath("//table")[0].xpath(".//a"):
            uris.append(dept_link.attrib["href"])

    return uris

if __name__ == "__main__":
    _courses = dict()
    _depts = dict()

    for dept_uri in get_department_uris():
        print(f"\n[i] Starting to crawl {dept_uri}")

        res = requests.get(catalog_metu_base_uri + dept_uri)

        if res.status_code != 200:
            print(f"[!!] Status code returned {res.status_code}. Terminating.")
            exit(1)

        tree = html.fromstring(res.text)

        dept_name = tree.xpath("//h2")[0].text_content().title().replace("Of", "of")
        dept_website = tree.xpath("//div[@id='depts_links']/a[@target='extern']")[0].text_content()

        _depts[dept_name] = {
            "url": dept_website,
            "courses": dict()
        }

        semester_indx = 0

        for semester in tree.xpath("//table"):
            semester_indx += 1

            _depts[dept_name]["courses"][semester_indx] = list()

            for course in semester.xpath("./tr")[1:]:
                course_cells = course.xpath("./td")

                if len(course_cells) < 3:
                    break

                course_name_short = course_cells[0].text_content()
                course_name = course_cells[1].text_content()
                course_credit = int(course_cells[2].text_content())

                if course_credit == 0:
                    continue

                if course_name_short not in _courses:
                    _courses[course_name_short] = {
                        "name": course_name,
                        "credit": course_credit
                    }
                
                _depts[dept_name]["courses"][semester_indx].append(course_name_short)

        print(f"[i] Done with {dept_name}\n")

    with open("__courses.json", "w") as fp:
        json.dump(_courses, fp)
    
    with open("__depts.json", "w") as fp:
        json.dump(_depts, fp)