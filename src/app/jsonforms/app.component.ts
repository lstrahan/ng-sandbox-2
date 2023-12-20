import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, createAjv, isControl, optionIs, rankWith, schemaTypeIs, scopeEndsWith, setSchema, Tester } from '@jsonforms/core';
import { DataDisplayComponent } from './data.control';
import uischemaAsset from '/assets/afsim_event_uischema.json';
import schemaAsset from '/assets/afsim_event_schema.json';
import dataAsset from './data';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { CommonModule } from '@angular/common';
import { JsonFormsModule } from '@jsonforms/angular';
import {  } from '@jsonforms/core';

const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('department')
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, JsonFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class JsonformsComponent {
  renderers = [
    ...angularMaterialRenderers,
    { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer },
    {
      renderer: DataDisplayComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          scopeEndsWith('___data')
        )
      )
    },
    {
      renderer: LangComponent,
      tester: rankWith(
        6,
        and(
          isControl,
          optionIs('lang', true)
        )
      )
    },
  ];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data = dataAsset;
  refParserOptions = {
    dereference: {
      circular: false
    }
  }

  constructor() {
    let parser = new $RefParser();
    parser.bundle('../assets/afsim_event_schema.json');
    console.log(parser.schema);
    // $RefParser.dereference(this.schema, this.refParserOptions).then(res => setSchema(res.$schema));
  }
}
