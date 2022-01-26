import SearchNode from "shittyscrapper";
import {readFileSync} from "fs";


const data = readFileSync("./samples/sample_page.html", {encoding: "utf-8"})
const pattern = readFileSync("./samples/test_pattern.html", {encoding: "utf-8"})

const node = SearchNode.BuildSearchNode(pattern)
const result = node.MapData(data)

const sections: { Name: string, Mark: string, Marks: { Type: string, Date: string, Note: string }[] | undefined }[] = result.sections.filter(({
                                                                                                                                                  Name,
                                                                                                                                                  Mark
                                                                                                                                              }: { Name: string, Mark: string }) => Name != undefined && Mark != undefined)

for (let {Name, Mark, Marks} of sections) {
    Name = Name.replace(/\s\s/g, "").replace(/\n/g, "")
    console.log(Name, "=>", Mark)

    if (Marks) {
        for (let {Type, Date, Note} of Marks) {
            if (Type) {
                Type = Type.replace(/[^\w\d]/g, "")
            }
            console.log(`\t${Date}:${Type}\t=>\t${Note}`)
        }
    }

}
