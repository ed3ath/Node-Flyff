QUEST_EXISTDARK = {
	title = 'IDS_PROPQUEST_DUNGEONANDPK_INC_000593',
	character = 'MaSa_SainMayor',
	end_character = 'MaSa_SainMayor',
	start_requirements = {
		min_level = 45,
		max_level = 70,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN', 'JOB_KNIGHT', 'JOB_BLADE', 'JOB_JESTER', 'JOB_RANGER', 'JOB_RINGMASTER', 'JOB_BILLPOSTER', 'JOB_PSYCHIKEEPER', 'JOB_ELEMENTOR' },
		previous_quest = 'QUEST_CLOWNTEMPLE',
	},
	rewards = {
		gold = 0,
		exp = 669234,
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_IBLCRASHER', quantity = 8 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000594',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000595',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000596',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000597',
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000598',
		},
		begin_yes = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000599',
		},
		begin_no = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000600',
		},
		completed = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000601',
		},
		not_finished = {
			'IDS_PROPQUEST_DUNGEONANDPK_INC_000602',
		},
	}
}
