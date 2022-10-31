import { Type } from "@angular/core";

export interface BaseModalConfig<C> {
    data: any;
    title: string;
    component: Type<C>;
  }