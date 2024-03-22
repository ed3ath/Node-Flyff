QUEST_HEROJES_TRN5 = {
	title = 'IDS_PROPQUEST_INC_000559',
	character = 'MaDa_Homeit',
	end_character = 'MaDa_Heingard',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HEROJES_TRN4',
	},
	rewards = {
		gold = 0,
		exp = 0,
		job = 'JOB_JESTER',
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_VENHEART', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_GUARDMON1', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_VENHEART', monster_id = 'MI_GUARDMON1', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000560',
			'IDS_PROPQUEST_INC_000561',
			'IDS_PROPQUEST_INC_000562',
			'IDS_PROPQUEST_INC_000563',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000564',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000565',
		},
		completed = {
			'IDS_PROPQUEST_INC_000566',
			'IDS_PROPQUEST_INC_000567',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000568',
		},
	}
}
