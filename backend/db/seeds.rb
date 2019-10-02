# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require 'faker'

Musician.delete_all
Audition.delete_all

ari = Musician.create({name: 'Ari', instrument: 'violin'})
hannah = Musician.create({name: 'Hannah', instrument: 'viola'})
josue = Musician.create({name: 'Josue', instrument: 'cello'})
eric = Musician.create({name: 'Eric', instrument: 'timpani'})
alex = Musician.create({name: 'Alex', instrument: 'oboe'})
arielle = Musician.create({name: 'Arielle', instrument: 'harp'})

a1 = Audition.create({orchestra: "San Diego Symphony", position: "Section Viola", date: "Nov 2-5, 2019", excerpts: "https://www.sandiegosymphony.org/static/media/uploads/Auditions/2019_viola_audition_repertoire_list.pdf", musician_id: hannah.id})
a2 = Audition.create({orchestra: "LA Phil", position: "Principal Harp", date: "September 29-30, 2019", excerpts: "https://www.laphil.com/about/la-phil/meet-the-orchestra/auditions/", musician_id: arielle.id})
a3 = Audition.create({orchestra: "Philadelphia Orchestra", position: "Principal Oboe", date: "October 1–13, 2019", excerpts: "https://www.philorch.org/sites/default/files/Oct%202019%20Principal%20Oboe%20Audition%20Repertoire.pdf", musician_id: alex.id})
a4 = Audition.create({orchestra: "Vancouver", position: "Principal Cello", date: "November 25, 2019", excerpts: "https://www.vancouversymphony.ca/site-content/uploads/2019/08/Principal-Cello-Rep-List-Nov-25-2019.pdf", musician_id: josue.id})
a5 = Audition.create({orchestra: "Philadelphia Orchestra", position: "Principal 2nd Violin", date: "December 2019", excerpts: "https://www.metopera.org/about/auditions/orchestra/", musician_id: ari.id})
a6 = Audition.create({orchestra: "San Francisco Symphony", position: "Principal Timpani", date: "November 4 – 5, 2019", excerpts: "https://www.sfsymphony.org/SanFranciscoSymphony/media/Library/Event-Images/18-19/19-20%20season%20photos/Assistant-Principal-Timpani-Percussion-Rep-List-2019-SFS_2.pdf", musician_id: eric.id})

a7 = Audition.create({orchestra: "Tonhalle-Orchester Zürich", position: "Section Violin", date: "May 4, 2020", excerpts: "https://www.musicalchairs.info/lib?psection=jo&pid=30424&file_id=1263", musician_id: ari.id})
a8 = Audition.create({orchestra: "Deutsches Symphonie-Orchester Berlin", position: "Section Violin", date: "May 4, 2020", excerpts: "https://www.dso-berlin.de/de/orchester/ueber-das-dso/stellenangebote/?bereich=orchester#tabs", musician_id: ari.id})
a9 = Audition.create({orchestra: "Oslo Philharmonic", position: "Co-principal Cello", date: "Dec 2, 2019", excerpts: "https://ofo.no/uploads/documents/Alternerende-solocello-2019-Utdrag.pdf", musician_id: josue.id})

# Musician.create(name: Faker::FunnyName.name, )

# instrument_arr = [
#     'bass',
#     'bassoon',
#     'cello',
#     'clarinet',
#     'flute',
#     'french horn',
#     'harp',
#     'oboe',
#     'percussion',
#     'piccolo',
#     'timpani',
#     'trombone',
#     'trumpet',
#     'viola',
#     'violin',
# ]


# musician_arr = [
#     'Ari',
#     'Ben',
#     'Carrie',
#     'Dion',
#     'Ethan',
#     'Fredric',
#     'George',
#     'Heather',
#     'Irene',
#     'Justin',
#     'Kasia',
#     'Luka',
#     'Marc',
#     'Nielsen',
#     'Oscar',
#     'Patricia',
#     'Quentin',
#     'Rafael',
#     'Sylvan',
#     'Thibaud',
#     'Ulysses',
#     'Vince',
#     'Will',
#     'Xavier',
#     'Yvonne',
#     'Zoey'
# ]