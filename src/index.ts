import { prop, getModelForClass, modelOptions, getDiscriminatorModelForClass } from '@typegoose/typegoose';
import { connect } from 'mongoose'

// to have an shared collection
@modelOptions({ schemaOptions: { collection: "animal" } })
class Animal {
    @prop({ required: true, unique: true })
    public patientNumber!: number;
}

class Dog extends Animal {
    @prop()
    public cageNumber!: number;
}

class Cat extends Animal {
    @prop()
    public nameTag!: string;
}

class Parrot extends Animal {
    @prop()
    public commonMessage?: string;
}

const AnimalModel = getModelForClass(Animal);
const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog);
const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat);
const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot);

(async () => {
    await connect('mongodb://localhost:27017/typegoose');

    await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });
    await DogModel.create({ patientNumber: 1, cageNumber: 1 });

    // for this example its a "findOne" to lower the example code
    const found = await ParrotModel.findOne({}).exec();

    // this will "find" should log one of the 2 created above
    console.log("found", found);
})();
