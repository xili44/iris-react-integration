Class Prototype.DB.Genomes Extends %Persistent [ DdlAllowed ]
{

Property CYP1A2 As %Boolean;

Property CYP2C19 As %Boolean;

Property CYP2C9 As %Boolean;

Property CYP2D6 As %Boolean;

Property CYP3A4 As %Boolean;

Property CYP3A5 As %Boolean;

Property OPRM1 As %Boolean;

Property SLCO1B1 As %Boolean;

Property VKORC1 As %Boolean;

Storage Default
{
<Data name="GenomesDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
<Value name="2">
<Value>CYP1A2</Value>
</Value>
<Value name="3">
<Value>CYP2C19</Value>
</Value>
<Value name="4">
<Value>CYP2C9</Value>
</Value>
<Value name="5">
<Value>CYP2D6</Value>
</Value>
<Value name="6">
<Value>CYP3A4</Value>
</Value>
<Value name="7">
<Value>CYP3A5</Value>
</Value>
<Value name="8">
<Value>OPRM1</Value>
</Value>
<Value name="9">
<Value>SLCO1B1</Value>
</Value>
<Value name="10">
<Value>VKORC1</Value>
</Value>
</Data>
<DataLocation>^Prototype.DB.GenomesD</DataLocation>
<DefaultData>GenomesDefaultData</DefaultData>
<ExtentSize>1000</ExtentSize>
<IdLocation>^Prototype.DB.GenomesD</IdLocation>
<IndexLocation>^Prototype.DB.GenomesI</IndexLocation>
<Property name="%%CLASSNAME">
<AverageFieldSize>2</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,0,16,$lb("-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000","-10000000000000000000"),$lb(21,21,21,21,21,21,21,21,21,21,21,21,21,21,21),$lb(758198320,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,758198320))</Histogram>
<OutlierSelectivity>.999999:</OutlierSelectivity>
<Selectivity>0.0001%</Selectivity>
</Property>
<Property name="%%ID">
<AverageFieldSize>3.75</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(1,67,134,201,268,335,402,469,536,603,670,736,802,868,934,1000),$lb(0,0,0,1,0,0,1,0,0,1,0,0,1,0,0),$lb(822083584,822083584,909574144,909574144,825439232,825439232,842019072,808517632,909639680,842414080,858993920,858993920,875573760,808583168,909705216,875968768,892548608,892548608,909128448,808648704,925892608,909586432,926103040,926103040,942682624,808583168,909639680,943077376,959656960,959656960,825241648,825241648))</Histogram>
<Selectivity>1</Selectivity>
</Property>
<Property name="CYP1A2">
<AverageFieldSize>2.51</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="CYP2C19">
<AverageFieldSize>2.51</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="CYP2C9">
<AverageFieldSize>2.51</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="CYP2D6">
<AverageFieldSize>2.51</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="CYP3A4">
<AverageFieldSize>2.49</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="CYP3A5">
<AverageFieldSize>2.49</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="OPRM1">
<AverageFieldSize>2.48</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="SLCO1B1">
<AverageFieldSize>2.47</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<Property name="VKORC1">
<AverageFieldSize>2.48</AverageFieldSize>
<Histogram>$lb(.06666666666666666667,1,0,$lb(0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1),$lb(1,1,1,1,1,1,1,0,1,1,1,1,1,1,1),$lb(805306368,0,0,0,0,0,0,0,0,0,0,0,0,0,0,805306368,822083584,0,0,0,0,0,0,0,0,0,0,0,0,0,0,822083584))</Histogram>
<Selectivity>50.0000%</Selectivity>
</Property>
<SQLMap name="IDKEY">
<BlockCount>-20</BlockCount>
</SQLMap>
<StreamLocation>^Prototype.DB.GenomesS</StreamLocation>
<Type>%Storage.Persistent</Type>
}

}
