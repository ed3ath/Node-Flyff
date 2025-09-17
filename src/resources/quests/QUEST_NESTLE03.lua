QUEST_NESTLE03 = {
	title = 'IDS_PROPQUEST_INC_002112',
	character = 'MaFl_Nestle03',
	end_character = '',
	start_requirements = {
		min_level = 1,
		max_level = 129,
		job = { 'JOB_VAGRANT', 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_RID_RID_STI_NESCAFE01', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_RID_RID_BOA_NESCAFE01', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_RID_RID_BOA_NESCAFE02', quantity = 1, sex = 'Any', remove = true },
			{ id = 'II_RID_RID_BOA_NESCAFE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002113',
			'IDS_PROPQUEST_INC_002114',
		},
		begin_yes = nil,
		begin_no = nil,
		completed = {
			'IDS_PROPQUEST_INC_002115',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002116',
		},
	}
}
