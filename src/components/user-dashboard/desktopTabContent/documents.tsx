import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, FileText } from 'lucide-react'

interface DocumentsTabContentProps {
    documents: any[]
}

const DocumentsTabContent = ({ documents }: DocumentsTabContentProps) => {
    return (
        <Card className="border-[#E5E7EB] dark:border-[#1E293B]">
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#E5E7EB]">
                    My Documents
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]">
                    Access all your important documents and certificates
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {documents.map((doc) => (
                        <Card key={doc.id} className="border-[#E5E7EB] dark:border-[#1E293B] hover:shadow-lg transition-shadow">
                            <CardContent className="p-3 sm:p-4">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#2563EB]/10 dark:bg-[#2563EB]/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB] dark:text-[#3B82F6]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#E5E7EB] line-clamp-2">
                                            {doc.title}
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {doc.type}
                                            </Badge>
                                            <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                                                {doc.uploadedDate}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                            View
                                        </Button>
                                        <Button size="sm" className="flex-1 text-xs">
                                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default DocumentsTabContent